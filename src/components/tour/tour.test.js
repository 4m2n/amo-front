import {
  pipe,
  prop,
} from "ramda"
import {
  createShowList,
  formatShow,
  default as Tour,
} from "./tour"
import { render } from "@testing-library/react"
import React from "react"

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
                      ],
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-address",
                        },
                      ],
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "19H",
                        },
                      ],
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "12/06/1990",
                        },
                      ],
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "my-price",
                        },
                      ],
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
        time: "19H",
        date: new Date("06/12/1990"),
        price: "my-price",
        isUpcoming: false,
      }
    ])
  })

  it("format a show (especially the date)", () => {
    expect(
      formatShow({
        date: "13/07/1990", // date string in french format
      })
    ).toEqual({
      date: new Date("07/13/1990"),
      isUpcoming: false,
    })

    expect(
      formatShow({
        date: "13/07/2999", // date string in french format
      })
    ).toEqual({
      date: new Date("07/13/2999"),
      isUpcoming: true,
    })
  })

  const showMock = {
    date: new Date(),
  }

  it("renders a list of upcoming shows", () => pipe(
    props => <Tour {...props} />,
    render,
    prop("container"),
    container => container.querySelectorAll("table tbody tr.show"),
    shows => expect(shows).toHaveLength(3),
  )({
    upcomingShows: [
      showMock,
      showMock,
      showMock,
    ]
  }))

  it("renders a list of passed shows", () => pipe(
    props => <Tour {...props} />,
    render,
    prop("container"),
    container => [
      container.querySelectorAll("table tbody tr.show"),
      container.querySelector("p"),
    ],
    ([ shows, message ]) => {
      expect(shows).toHaveLength(0)
      expect(message.textContent).toBe(
        "Il n'y à aucun concert prévu à ce jour !"
      )
    },
  )({
    upcomingShows: [],
  }))

  it("renders a message if there is no upcoming shows", () => pipe(
    props => <Tour {...props} />,
    render,
    prop("container"),
    container => container.querySelectorAll("table tbody tr.show"),
    shows => expect(shows).toHaveLength(2),
  )({
    passedShows: [
      showMock,
      showMock,
    ]
  }))

  it("renders a message if there is no passed shows", () => pipe(
    props => <Tour {...props} />,
    render,
    prop("container"),
    container => [
      container.querySelectorAll("table tbody tr.show"),
      container.querySelector("p:last-of-type"),
    ],
    ([ shows, message ]) => {
      expect(shows).toHaveLength(0)
      expect(message.textContent).toBe(
        "Il n'y à pas encore de concerts passés à afficher !"
      )
    },
  )({
    passedShows: [],
  }))
})
