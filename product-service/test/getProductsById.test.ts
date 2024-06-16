import { handler } from "../handlers/getProductsById";
import products from "../data/products";
import { APIGatewayProxyResult } from "aws-lambda";

describe("Lambda getProducts Handler", () => {
  it("should return 200 and the product", async () => {
    const event = { pathParameters: { id: "1" } };
    const result = await handler(event as any, {} as any, {} as any);

    const { statusCode, body } = result as APIGatewayProxyResult;
    expect(statusCode).toBe(200);
    expect(body).toBe(JSON.stringify(products[0]));
  });

  it("should return 404 if the product is not found", async () => {
    const event = { pathParameters: { id: "4" } };
    const result = await handler(event as any, {} as any, {} as any);

    const { statusCode, body } = result as APIGatewayProxyResult;
    expect(statusCode).toBe(404);
    expect(body).toBe("Product with id 4 not found");
  });

  it("should return 500 if there is an error", async () => {
    jest.mock("../data/products", () => {
      throw new Error("Test error");
    });

    const event = {};
    try {
      await handler(event as any, {} as any, {} as any);
    } catch (error) {
      const result = error as any;

      expect(result.statusCode).toBe(500);
      expect(result.body).toBe("Test error");
    }
  });
});
