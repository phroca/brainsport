const { withAndroidManifest, withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

/**
 * Plugin pour corriger le conflit AndroidX / Support Library
 * en ajoutant explicitement android:appComponentFactory avec la valeur AndroidX
 */
module.exports = function androidxFixPlugin(config) {
    // Première approche : utiliser withAndroidManifest
    config = withAndroidManifest(config, async (config) => {
        const androidManifest = config.modResults.manifest;

        // S'assurer que le manifest existe
        if (!androidManifest || !androidManifest.manifest) {
            return config;
        }

        // Ajouter l'espace de noms tools dans le manifest root si nécessaire
        if (!androidManifest.manifest.$) {
            androidManifest.manifest.$ = {};
        }

        if (!androidManifest.manifest.$["xmlns:tools"]) {
            androidManifest.manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
        }

        // Trouver l'élément application
        if (!androidManifest.manifest.application || !Array.isArray(androidManifest.manifest.application) || androidManifest.manifest.application.length === 0) {
            return config;
        }

        const application = androidManifest.manifest.application[0];
        if (!application) {
            return config;
        }

        if (!application.$) {
            application.$ = {};
        }

        // IMPORTANT: Définir la valeur AVANT tools:replace
        // Cela garantit que la valeur est présente quand tools:replace est évalué
        application.$["android:appComponentFactory"] = "androidx.core.app.CoreComponentFactory";

        // Ensuite, ajouter tools:replace pour indiquer que cette valeur doit remplacer les autres
        if (application.$["tools:replace"]) {
            // Si tools:replace existe déjà, ajouter appComponentFactory à la liste
            const existingReplace = application.$["tools:replace"];
            if (!existingReplace.includes("android:appComponentFactory")) {
                application.$["tools:replace"] = `${existingReplace},android:appComponentFactory`;
            }
        } else {
            // Créer tools:replace avec appComponentFactory
            application.$["tools:replace"] = "android:appComponentFactory";
        }

        return config;
    });

    // Deuxième approche : modifier directement le fichier XML après génération
    config = withDangerousMod(config, [
        "android",
        async (config) => {
            const manifestPath = path.join(
                config.modRequest.platformProjectRoot,
                "app",
                "src",
                "main",
                "AndroidManifest.xml"
            );

            if (fs.existsSync(manifestPath)) {
                let manifestContent = fs.readFileSync(manifestPath, "utf-8");

                // Vérifier si xmlns:tools existe dans le manifest root
                if (!manifestContent.includes('xmlns:tools=')) {
                    manifestContent = manifestContent.replace(
                        /<manifest([^>]*)>/,
                        (match, attrs) => {
                            if (!attrs.includes('xmlns:tools=')) {
                                return `<manifest${attrs} xmlns:tools="http://schemas.android.com/tools">`;
                            }
                            return match;
                        }
                    );
                }

                // Vérifier si android:appComponentFactory existe dans l'application
                // Si tools:replace existe mais pas android:appComponentFactory, l'ajouter
                if (manifestContent.includes('tools:replace') && !manifestContent.includes('android:appComponentFactory=')) {
                    // Trouver la balise <application> et ajouter android:appComponentFactory
                    manifestContent = manifestContent.replace(
                        /(<application[^>]*)(>)/,
                        (match, appTag, closing) => {
                            // Vérifier si android:appComponentFactory n'est pas déjà présent
                            if (!appTag.includes('android:appComponentFactory=')) {
                                // Ajouter android:appComponentFactory avant le >
                                return `${appTag} android:appComponentFactory="androidx.core.app.CoreComponentFactory"${closing}`;
                            }
                            return match;
                        }
                    );
                } else if (!manifestContent.includes('android:appComponentFactory=')) {
                    // Si ni tools:replace ni android:appComponentFactory n'existent, les ajouter tous les deux
                    manifestContent = manifestContent.replace(
                        /(<application[^>]*)(>)/,
                        (match, appTag, closing) => {
                            if (!appTag.includes('android:appComponentFactory=')) {
                                let newAppTag = appTag;
                                if (!newAppTag.includes('tools:replace=')) {
                                    newAppTag += ' tools:replace="android:appComponentFactory"';
                                }
                                newAppTag += ' android:appComponentFactory="androidx.core.app.CoreComponentFactory"';
                                return `${newAppTag}${closing}`;
                            }
                            return match;
                        }
                    );
                }

                fs.writeFileSync(manifestPath, manifestContent, "utf-8");
            }

            return config;
        },
    ]);

    return config;
};

