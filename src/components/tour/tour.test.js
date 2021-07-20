import renderer from "react-test-renderer"
import React from "react"
import {
  createShowList,
  BookShowButton,
} from "./tour"

describe("components :: tour :: createShowList", () => {
  it("creates a show list from an HtmlAst", () => {
    const ast = {
      children: [
        {},
        {},
        {
          tagName: "table",
          children: [
            {
              tagName: "thead"
            },
            {
              tagName: "tbody",
              children: [
                {
                  tagName: "tr",
                  children: [
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-city",
                        },
                      ]
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-address",
                        },
                      ]
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-date",
                        },
                      ]
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-price",
                        },
                      ]
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-link",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }

    expect(createShowList(ast)).toEqual([
      {
        address: "my-address",
        buy: "my-link",
        city: "my-city",
        date: "my-date",
        price: "my-price",
      }
    ])
  })
})

describe("components :: tour :: BookShowButton", () => {
  it("renders a reservation link with the price", () => {
    const show = {
      price: "35",
      buy: "my-wonderfull-buy-link",
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
    }
    const component = renderer.create(
      <BookShowButton show={show}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
