import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import products from "../data/products";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(products),
    };
  } catch (error) {
    const { message } = error as Error;

    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: message.toString() || "",
    };
  }
};
