import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Accordion, Segment, Grid, Image, Icon, Loader } from 'semantic-ui-react';

//todo: debounce search
const SuggestedImages = ({ term, onSelectImage }) => {
    if (!term) return null;

    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    //only update query and images if passed term is different
    if (term !== query) setQuery(term);

    //rerender the component when new images are retrieved
    useEffect(() => {
        setLoading(false);
    }, [images]);

    //when query is updated by the passed term, get new photos
    useEffect(() => {
        if (!query) return;

        const getImages = () => {
            axios.get('https://api.unsplash.com/search/photos', {
                headers: {
                    Authorization: `Client-ID ${process.env.MIX_REACT_APP_UNSPLASH_PUBLIC}`
                },
                params: { query }
            }).then(response => {
                const tempResults = response.data.results.map(result => {
                    const urls = result.urls;
                    urls.download = result.links.download;
                    return urls;
                });
                setImages(tempResults);
            }).catch(error => {
                console.error(error);
            });
        };

        setLoading(true);
        const timeoutID = setTimeout(() => {
            getImages();
        }, 1000);
        return () => {
            clearTimeout(timeoutID);
        }
    }, [query]);

    const onSelectSuggestedImage = () => {

    };

    //map image urls to Image component to be rendered
    let renderedImages;
    if (images.length) renderedImages = images.map(urls => {
        return (
            <Grid.Column key={urls.full} style={{ padding: '0.25rem' }}>
                <Image src={urls.thumb} onClick={() => onSelectImage(urls)}/>
            </Grid.Column>
        );
    });
    else renderedImages = ( //TODO: style
        <div>No Results Found</div>
    );

    return (
        <Accordion fluid styled>
            <Accordion.Title
                active={open}
                onClick={() => setOpen(!open)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Icon name='dropdown' />
                        <span style={{ paddingRight: '0.25rem' }}>Suggested Images</span>
                        {
                            loading
                                ? <Loader inline size='tiny' />
                                : ` (${images.length})`
                        }
                    </div>
                    <a href="https://www.unsplash.com" style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
                        powered by <span style={{ color: '#4183c4' }}>unsplash.com</span>
                    </a>
                </div>
            </Accordion.Title>
            <Accordion.Content active={open}>
                <Segment>
                    <Grid centered stackable doubling
                        columns="5">
                        {renderedImages}
                    </Grid>
                </Segment>
            </Accordion.Content>
        </Accordion>

    );
}

export default SuggestedImages;