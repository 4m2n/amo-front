import renderer from "react-test-renderer"
import React from "react"
import BookShowButton from "./book-show-button"

describe("components :: tour :: book-show-button", () => {
  it("renders a reservation link with the price", () => {
    const show = {
      price: "35",
      buy: "my-wonderfull-buy-link",
      isUpcoming: true,
    }
    const component = renderer.create(
      <BookShowButton show={show}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it("renders a reservation link with \"free\" label when there is a book link but no price", () => {
    const show = {
      price: undefined,
      buy: "my-wonderfull-buy-link",
      isUpcoming: true,
    }
    const component = renderer.create(
      <BookShowButton show={show}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it("renders an \"on site booking button\" when no book link exists, but there is a price", () => {
    const show = {
      price: "35",
      buy: undefined,
      isUpcoming: true,
    }
    const component = renderer.create(
      <BookShowButton show={show}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it("renders a \"free\" label when no price or book link exists", () => {
    const show = {
      price: undefined,
      buy: undefined,
      isUpcoming: true,
    }
    const component = renderer.create(
      <BookShowButton show={show}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it("renders an hyphen is the show is passed", () => {
    const show = {
      isUpcoming: false,
    }
    const component = renderer.create(
      <BookShowButton show={show}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
