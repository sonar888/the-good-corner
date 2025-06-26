import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      price
      image
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
query GetAllCategories {
  getAllCategories {
    id
    name
  }
}`
;

export const GET_ALL_CATEGORIES_AND_ADS = gql`
query GetAllCategoriesAndTags {
  getAllCategories {
    id
    name
  }
  getAllTags {
    id
    name
  }
}`

export const GET_ONE_AD = gql`
query GetOneAd($adId: Float!) {
  getOneAd(id: $adId) {
    id
    title
    description
    owner
    location
    price
    image
    createdDate
    category {
      name
        }
    tags {
      name
      id
    }
  }
}`
;

export const DELETE_AD =gql`
mutation DeleteAd($deleteAdId: Float!) {
  deleteAd(id: $deleteAdId)
}`
;

export const CREATE_AD = gql`
mutation CreateAd($data: AdInput!) {
  createAd(data: $data) {
    id
  }
}`
;

export const UPDATE_AD= gql`
mutation UpdateAd($data: AdInput!, $updateAdId: Float!) {
  updateAd(data: $data, id: $updateAdId) {
    id
  }
}`