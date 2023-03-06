const { withAndroidManifest } = require("@expo/config-plugins")

module.exports = function androiManifestPlugin(config) {
    return withAndroidManifest(config, async config => {
      let androidManifest = config.modResults.manifest  
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


      return config
    })
  }
