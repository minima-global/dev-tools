import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll } from "vitest"

export const restHandlers = [
  http.get("https://example.com/api/data", () => {
    return HttpResponse.json({
      success: true,
      message: "Data received",
    })
  }),
]

const server = setupServer(...restHandlers, ...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
