function h(
    type: string | Function, 
    props: any, 
    ...children: Array<any>) : JSX.Element {

    if (type instanceof Function) {
        // Custom nested element
        return <JSX.Element>type(props);
    }

    const appendChild = (childCollection: Array<JSX.Element>, child: any) => {
        if (Array.isArray(child)) {
            child.forEach((nestedChild) => appendChild(childCollection, nestedChild));
        } else {
            childCollection.push(
                    child.type 
                        ? h(child.type, child.props, child.children)
                        : {
                            key: null,
                            props: child,
                            type: "TEXT_ELEMENT",
                        }
                );
        }
    }

    const elementProps = props ?? {};
    if (children.length && elementProps.children === undefined) {
        // children are added to the special prop "children"
        const childrenProp: Array<any> = [];
        children.forEach((child) => {
            if (child === undefined) {
            } else if (child.props?.children) {
                childrenProp.push(child); // "already processed"??
            } else {
                appendChild(childrenProp, child);
            }
        });

        elementProps.children = childrenProp;
    }

    return {
        key: null,
        props: elementProps,
        type: type,
    };
}

export default h;