import { handler } from "../handlers/getProductsList";
import products from "../data/products";
import { APIGatewayProxyResult } from "aws-lambda";

describe("Lambda getProducts Handler", () => {
  it("should return 200 and the products list", async () => {
    const event = {};
    const result = await handler(event as any, {} as any, {} as any);

    const { statusCode, body } = result as APIGatewayProxyResult;
    expect(statusCode).toBe(200);
    expect(body).toBe(JSON.stringify(products));
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
