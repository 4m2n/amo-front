import soundcloudWidgetRepository from "./soundcloud-widget-repository"

describe("soundcloudWidgetRepository", () => {
  it("can be initialized with a widget default value", () => {
    expect(
      soundcloudWidgetRepository.getInstance()
    ).toBeNull()
  })

  it("can retrieve a previously set instance", () => {
    let repository = soundcloudWidgetRepository
    repository.setInstance("my-widget")

    expect(
      repository.getInstance()
    ).toBe(
      "my-widget"
    )
  })
})
