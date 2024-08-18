import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export default function ThirdwebProviderComp({ children }) {
    // const connectors = {
    //   injected: {},
    // };
    // const supportedChainIds = [1, 3, 4, 5, 42, 80001];
    const activeChain = ChainId.Polygon;
    return (
        <ThirdwebProvider
            // connectors={connectors}
            // supportedChainIds={supportedChainIds}
            activeChain={activeChain}
            clientId="d2095fdac5878d0a8ece7146dec1a2567768b166e315633df4143b7936d1536476404a89a1432d490a98f2b303bb2090ab9509dfa2696c25d81260c7830fc36f">
            {children}
        </ThirdwebProvider>
    );
}
