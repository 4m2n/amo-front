import {
  createShowList,
  formatShow,
  sortShowsByDateDesc,
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
                          value: "19H",
                        },
                      ]
                    },
                    {
                      tagName: "td",
                      children: [
                        {
                          type: "text",
                          value: "12/06/1990",
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
        time: "19H",
        date: new Date("06/12/1990"),
        price: "my-price",
      }
    ])
  })

  it("format a show (especially the date)", () => {
    const showMock = {
      address: "2 rue galilée",
      buy: "https://weshop.io/xdslkgjLGJ8",
      city: "Nantes",
      date: "13/07/1990",
      price: "70",
    }

    expect(
      formatShow(showMock)
    ).toEqual({
      address: "2 rue galilée",
      buy: "https://weshop.io/xdslkgjLGJ8",
      city: "Nantes",
      date: new Date("07/13/1990"),
      price: "70",
    })
  })

  it("sort a show list by date", () => {
    expect(sortShowsByDateDesc([
      { address: "d", date: new Date("07/27/1960") },
      { address: "a", date: new Date("06/12/1990") },
      { address: "b", date: new Date("12/04/1985") },
      { address: "c", date: new Date("10/15/1960") },
    ])).toEqual([
      { address: "a", date: new Date("06/12/1990") },
      { address: "b", date: new Date("12/04/1985") },
      { address: "c", date: new Date("10/15/1960") },
      { address: "d", date: new Date("07/27/1960") },
    ])
  })
})
