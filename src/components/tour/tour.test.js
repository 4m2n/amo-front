import {
  createShowList,
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
