import { JsonFragment } from '@ethersproject/abi';

interface Deployment {
  address: string;
  abi: JsonFragment[];
}

export type Deployments = {
  [contractName: string]: Deployment;
};
