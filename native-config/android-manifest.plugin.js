const { withAndroidManifest } = require("expo/config-plugins")

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async config => {
    let androidManifest = config.modResults.manifest

    // Ajouter les queries pour Google Quick Search Box et la reconnaissance vocale
    const googleQuichsearchBoxPackage = {
      "package": {
        $: {
          "android:name": "com.google.android.googlequicksearchbox"
        }
      }
    }
    const intentRecognition = {
      "intent": [
        {
          "action": {
            $: {
              "android:name": "android.speech.RecognitionService"
            }
          }
        },
        {
          "action": {
            $: {
              "android:name": "android.speech.SpeechRecognizer"
            }
          }
        }

      ]
    }

    androidManifest["queries"].push(googleQuichsearchBoxPackage);
    androidManifest["queries"].push(intentRecognition);

    // Corriger le conflit AndroidX / Support Library
    // Ajouter tools:replace="android:appComponentFactory" dans l'élément application

    // S'assurer que le manifest a les attributs nécessaires
    if (!androidManifest.manifest) {
      androidManifest.manifest = {};
    }

    if (!androidManifest.manifest.$) {
      androidManifest.manifest.$ = {};
    }

    // Ajouter l'espace de noms tools si nécessaire
    if (!androidManifest.manifest.$["xmlns:tools"]) {
      androidManifest.manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
    }

    // Trouver l'élément application et ajouter tools:replace
    if (!androidManifest.manifest.application) {
      androidManifest.manifest.application = [{}];
    }

    if (androidManifest.manifest.application && androidManifest.manifest.application[0]) {
      const application = androidManifest.manifest.application[0];
      if (!application.$) {
        application.$ = {};
      }
      // Ajouter tools:replace pour résoudre le conflit appComponentFactory
      // Cela permet de remplacer la valeur de appComponentFactory en cas de conflit
      if (!application.$["tools:replace"]) {
        application.$["tools:replace"] = "android:appComponentFactory";
      } else {
        // Si tools:replace existe déjà, ajouter appComponentFactory à la liste
        const existingReplace = application.$["tools:replace"];
        if (!existingReplace.includes("android:appComponentFactory")) {
          application.$["tools:replace"] = `${existingReplace},android:appComponentFactory`;
        }
      }
    }

    return config
  })
}
