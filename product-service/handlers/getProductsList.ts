import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "text/plain" },
      body: "Products not found",
    };
  }
};
