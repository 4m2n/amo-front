import React from "react"
import {
  createSrcSet,
  generateImageSizesFromList,
  getDefaultSrc,
} from "./../../utils"

// Image :: Props -> Component
const Image = ({
  alt = "",
  error = null,
  height = 0,
  sizes = [768, 1024, 1216, 1408], // default bulma breakpoints
  sources = [],
  width = 0,
}) =>
  error
    ? <p className="error">
        L'image n'a pas pu être chargée : {error}.
      </p>
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

export default Image
