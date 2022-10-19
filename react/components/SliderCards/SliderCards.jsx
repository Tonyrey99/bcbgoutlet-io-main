import React from "react"
import { SliderLayout } from "vtex.slider-layout";
import styles from './style.css'

const SliderCards = (props) => {

  return (

      <div className={`${styles.sliderCards__wrapper}`}>
        <SliderLayout
          infinite={true}
          showPaginationDots={"never"}
          showNavigationArrows={"always"}
          fullWidth={props.fullWidth}
          itemsPerPage={
            {
              desktop: props.itemsPerPageDesktop,
              tablet: props.itemsPerPageTablet,
              phone: props.itemsPerPagePhone
            }
          }
        >
          {props.banners?.map(({img, text, link, target}, index) => {
            return (
              <div className={`${styles.sliderCards__card} flex flex-column items-center`} key={`SC-${index}`}>
                <a href={link} target={target == "internal" ? "_self" : "_blank" } className={styles.sliderCards__link}>
                  <div className={styles.sliderCards__imageWrapper}>
                    <img src={img} alt={text} title={text} className={styles.sliderCards__image} />
                  </div>
                  <h4 className={styles.sliderCards__text}>{text}</h4>
                </a>
              </div>
            )
          })}
        </SliderLayout>
      </div>

  )
}

SliderCards.defaultProps = {
  title: 'Title',
  itemsPerPageDesktop: 6,
  itemsPerPageTablet: 4,
  itemsPerPagePhone: 2,
  fullWidth: false,
  target: "internal",
  link: "/"
}

SliderCards.getSchema = () => {
  return {
    title: "Slider Cards",
    type: "object",
    properties: {
      itemsPerPageDesktop:{
        title: "Minimum items in Desktop",
        type: "number",
        default: SliderCards.defaultProps.itemsPerPageDesktop
      },
      itemsPerPageTablet:{
        title: "Minimum items in Tablets",
        type: "number",
        default: SliderCards.defaultProps.itemsPerPageTablet
      },
      itemsPerPagePhone:{
        title: "Minimum items in Phones",
        type: "number",
        default: SliderCards.defaultProps.itemsPerPagePhone
      },
      fullWidth:{
        title: "Full Width?",
        type: "boolean",
        enum: [
          true,
          false
        ],
        default: SliderCards.defaultProps.fullWidth
      },
      banners: {
        type: "array",
        title: "Banners",
        items: {
          type: "object",
          title: "Banner",
          properties: {
            text: {
              type: "string",
              title: "Text",
            },
            link: {
              type: "string",
              title: "Link",
              default: SliderCards.defaultProps.link
            },
            target:{
              title: "External link?",
              type: "string",
              enum: [
                "internal",
                "external"
              ],
              default: SliderCards.defaultProps.target
            },
            img: {
              type: "string",
              title: "Image",
              widget: {
                "ui:widget": "image-uploader"
              },
            },
          },
        },
      },
    },
  };
};

export default SliderCards;
