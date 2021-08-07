const soundcloudWidgetRepository = (
  instance => ({
    setInstance: widget => instance = widget,
    getInstance: () => instance,
  })
)(null)

export default soundcloudWidgetRepository
