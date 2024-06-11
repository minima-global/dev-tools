import { describe, expectTypeOf, test } from "vitest"
import { MDS } from "./index"

describe("MDS variable type checks", () => {
  test("should have the correct types for MDS variables", () => {
    expectTypeOf(MDS.DEBUG_HOST).toEqualTypeOf<string | null>
    expectTypeOf(MDS.DEBUG_PORT).toEqualTypeOf<number>
    expectTypeOf(MDS.DEBUG_MINIDAPPID).toEqualTypeOf<string>
    expectTypeOf(MDS.minidappuid).toEqualTypeOf<string | null>()
    expectTypeOf(MDS.filehost).toEqualTypeOf<string>()
    expectTypeOf(MDS.mainhost).toEqualTypeOf<string>()
    expectTypeOf(MDS.logging).toEqualTypeOf<boolean>()
  })
})

describe("MDS functions type checks", () => {
  test("should have the correct types for MDS functions", () => {
    expectTypeOf(MDS.init).toBeFunction()
    expectTypeOf(MDS.init).parameter(0).toBeFunction()
    expectTypeOf(MDS.log).toBeFunction()

    expectTypeOf(MDS.cmd).parameter(0).toBeString()

    expectTypeOf(MDS.cmd).toBeFunction()
    expectTypeOf(MDS.notify).toBeFunction()
    expectTypeOf(MDS.notifycancel).toBeFunction()
  })
})
