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

    const api = new apigateway.RestApi(this, "GetProductsListApi", {
      restApiName: "Products list",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const productsResource = api.root.addResource("products");
    const productsIntegration = new apigateway.LambdaIntegration(
      getProductsListFunction
    );
    productsResource.addMethod("GET", productsIntegration);
  }
}
