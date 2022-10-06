import jsonConfig from '../config.json'
import { App } from 'vue';
import { cpaasActions, CPaaSEvents, cpaas } from '@cpaassdk/cpaas-sdk'
import { uniqueNamesGenerator, colors } from 'unique-names-generator';




const generateId = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors],
    style: 'lowerCase'
  });
}

const clientId: string = generateId();
export default {

  install: async (app: App, options: any) => {

    let cpaasEvents: CPaaSEvents

    //Create use function for api plugin
    const useFunction = async (clientId: string) => {

      if (!cpaasEvents) {
        
        //Get app's globalProps
        const globalProps = app.config.globalProperties;

        //Select settings preset by destination target
        const settings: cpaas.data.JsSettings = jsonConfig;

        //Generate new clientId if none provided
        globalProps.$cpaas.clientId = clientId || generateId();

        //Set clientId from global props
        settings.clientId = globalProps.$cpaas.clientId;

        //Call API register with the matched settings
        cpaasEvents = await cpaasActions.register(settings);

      } else {
        console.warn('cPaas API plugin already registered')
      }
      return cpaasEvents;
    };

    /*inject a global instance of cpaas api
      registers only on first install */
    app.config.globalProperties.$cpaas = {
      useApi: useFunction,
      clientId: clientId || generateId()
    }

  }

}