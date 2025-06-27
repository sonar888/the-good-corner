import { ApolloServer } from "@apollo/server";
import AdResolver from '../resolvers/AdResolver';
import { Ad } from '../src/entities/Ad';

// Mocking the Ad entity methods
jest.mock('../src/entities/Ad');

describe('AdResolver', () => {

  beforeEach(() => {
    server = new ApolloServer({
      typeDefs: gql`
        type Ad {
          id: ID!
          title: String!
          description: String!
          owner: String!
          location: String!
          price: Float!
          image: String!
          category: Category!
          tags: [Tag!]!
        }
        type Category {
          id: ID!
          name: String!
        }
        type Tag {
          id: ID!
          name: String!
        }
        type Query {
          getAllAds: [Ad!]!
          getOneAd(id: Int!): Ad!
        }
        type Mutation {
          createAd(data: AdInput!): Ad!
          updateAd(id: Int!, data: AdInput!): Ad!
          deleteAd(id: Int!): ID!
        }
        input AdInput {
          title: String!
          description: String!
          owner: String!
          location: String!
          price: Float!
          image: String!
          category: ID!
          tags: [ID!]!
        }
      `,
      resolvers: [AdResolver],
    });
  });

  // Test for `getAllAds`
  it('should return all ads', async () => {
    const adsMock = [{ id: 1, title: 'Ad 1', description: 'Description 1', owner: 'Owner 1', location: 'Location 1', price: 10, image: 'image1.jpg', category: { id: 1, name: 'Category 1' }, tags: [{ id: 1, name: 'Tag 1' }] }];
    
    Ad.find.mockResolvedValue(adsMock);
    const GET_ALL_ADS = gql`
      query {
        getAllAds {
          id
          title
          description
          owner
          location
          price
          image
          category {
            id
            name
          }
          tags {
            id
            name
          }
        }
      }
    `;
    const { data } = await mockServer(server).query(GET_ALL_ADS);

    expect(data.getAllAds).toEqual(adsMock);
    expect(Ad.find).toHaveBeenCalledTimes(1);
  });

})