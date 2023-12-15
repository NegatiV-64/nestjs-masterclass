import { FC, Fragment, ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface PageProps {
    title: string;
    children: ReactNode;
    description?: string;
    keywords?: string[];
}

export const Page: FC<PageProps> = ({ children, description, keywords, title }) => {
    return (
        <Fragment>
            <Helmet>
                <title>{title}</title>
                {
                    description ? <meta name="description" content={description} /> : null
                }
                {
                    keywords && keywords.length > 0 ? <meta name="keywords" content={keywords.join(', ')} /> : null
                }
            </Helmet>
            {children}
        </Fragment>
    );
}