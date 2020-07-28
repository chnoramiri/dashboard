// ************************************************************************* Don't change me. I'm stable.     <<<<<<<<<<<<<<<<<<<<<<<<<<<
//components
import { PortalContext } from './PortalContext';
import React from 'react'

export function withContext(Component) {
    return function ContextComponent(props) {
        return <PortalContext.Consumer>{contexts => <Component {...props} {...contexts} />}</PortalContext.Consumer>;
    };
}
// ************************************************************************* Don't change me. I'm stable.     <<<<<<<<<<<<<<<<<<<<<<<<<<<
