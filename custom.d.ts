import { cPaasJsApi } from "cpaas-api"

declare module 'vue' {
  interface ComponentCustomProperties {
    $cpaasApi: typeof cPaasJsApi.CPaaSAPI
  }
}