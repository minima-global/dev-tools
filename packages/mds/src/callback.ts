import type { MDS_MAIN_CALLBACK as MDSMainCallbackType } from "./types"
// Export an object containing the shared state
export const SharedState = {
  MDS_MAIN_CALLBACK: null as MDSMainCallbackType,
  API_CALLS: [] as any[],
}
