import React, { useEffect, useState } from "react"
import { pipe, map, prop } from "ramda"
import {
  createSourceList,
  createSrcSet,
  generateImageSizesFromList,
  getDefaultSrc,
} from "./../../utils"

// Image :: Props -> Component
const Image = ({
  filename = "",
  alt = "",
  sizes = [768, 1024, 1216, 1408], // default bulma breakpoints
  formats = ["webp", "jpg"],
  width = 0,
  height = 0,
}) => {
  const [sources, setSources] = useState([])
  const [error, setError] = useState(false)

  // create a stringified source list to pass it as a dependency of useEffect
  const fileList = pipe(
    createSourceList(sizes, formats),
    JSON.stringify,
  )(filename)

  // import sources as modules and store them in the local state
  useEffect(() => pipe(
    JSON.parse,
    fileList => Promise.all(fileList.map(
      src => import(`/src/assets/images/${src}`),
    ))
    .then(pipe(
      map(prop('default')),
      setSources,
    ))
    .catch(() => setError(true))
  )(fileList), [fileList, setSources, setError])

  return (
    error
      ? <p>An error occcured while rendering the image.</p>
      : sources.length > 0 &&
          <picture>
            <source
              data-testid="source"
              srcSet={createSrcSet("webp")(sources)}
              sizes={generateImageSizesFromList(sizes)}
            />
            <img
              data-testid="img"
              width={width}
              height={height}
              src={getDefaultSrc(sources)}
              srcSet={createSrcSet("jpg|png")(sources)}
              sizes={generateImageSizesFromList(sizes)}
              alt={alt}
            />
          </picture>
  )
}

export default Image
