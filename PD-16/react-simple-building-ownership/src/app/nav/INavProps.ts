import { ActiveNavLinkType } from "./ActiveNavLinkType";

export interface INavProps {
    chainId: number;
    networkId: number;
    account: string;
    activeNavLink: ActiveNavLinkType
}