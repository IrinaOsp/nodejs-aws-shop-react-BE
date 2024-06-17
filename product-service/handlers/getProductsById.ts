import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import products from "../data/products";
import headers from "../utils/headers";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const productId = event.pathParameters?.id;
    if (!productId)
      return {
        statusCode: 404,
        headers,
        body: "Product id is not provided or invalid",
      };

    const product = products.find((p) => p.id === parseInt(productId));
    if (!product)
      return {
        statusCode: 404,
        headers,
        body: `Product with id ${productId} not found`,
      };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    };
  } catch (error) {
    const { message } = error as Error;
    return {
      statusCode: 500,
      headers,
      body: message.toString() || "",
    };
  }
};
