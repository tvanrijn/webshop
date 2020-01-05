import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import SECTIONS_DATA from "./sections.data.js";

const Directory = ({ sections }) => (
    <div className='directory-menu'>
        {sections.map(({ id, ...props }) => (
            <MenuItem key={id} {...props} />
        ))}
    </div>
)

Directory.defaultProps = {
    sections: SECTIONS_DATA
}

export default Directory;