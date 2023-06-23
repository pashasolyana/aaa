export function throttle(func: any, ms: any) {
  let isThrottled = false,
    savedArgs: any,
    savedThis: any

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments
      //@ts-ignore
      savedThis = this
      return
    }
    //@ts-ignore
    func.apply(this, arguments)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}
