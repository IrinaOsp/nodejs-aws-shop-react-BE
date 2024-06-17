import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { resolve } from "path";

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getProductsListFunction = new NodejsFunction(
      this,
      "GetProductsListFunction",
      {
        functionName: "getProductsList",
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: resolve("handlers/getProductsList.ts"),
      }
    );

    const getOneProductFunction = new NodejsFunction(this, "getProductsById", {
      functionName: "getProductsById",
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: resolve("handlers/getProductsById.ts"),
    });

    const api = new apigateway.RestApi(this, "ProductsApi", {
      restApiName: "Products",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const productsResource = api.root.addResource("products");
    const oneProductResource = productsResource.addResource("{id}");
    const productsIntegration = new apigateway.LambdaIntegration(
      getProductsListFunction
    );
    const oneProductIntegration = new apigateway.LambdaIntegration(
      getOneProductFunction
    );
    productsResource.addMethod("GET", productsIntegration);
    oneProductResource.addMethod("GET", oneProductIntegration);
  }
}
