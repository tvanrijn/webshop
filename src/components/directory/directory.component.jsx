import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import SECTIONS_DATA from "./sections.data.js";
import { DirectoryMenu } from './directory.styles';

const Directory = ({ sections }) => (
    <DirectoryMenu>
        {sections.map(({ id, ...props }) => (
            <MenuItem key={id} {...props} />
        ))}
    </DirectoryMenu>
)

Directory.defaultProps = {
    sections: SECTIONS_DATA
}

export default Directory;