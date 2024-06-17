import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import products from "../data/products";
import headers from "../utils/headers";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
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
