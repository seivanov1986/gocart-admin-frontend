import { Button, Divider, Flex, Input, Pagination, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined, UpCircleOutlined, SyncOutlined, FolderAddOutlined, 
    DeleteOutlined, DragOutlined, PlusCircleOutlined, FolderOutlined } from '@ant-design/icons';
import ImageModal from '../../modals/Image';
import { HOST } from '../../const'

const CustomImage = (props) => {
    console.log(props)

    let src = HOST + "/dynamic/180x180" + props.item.ImagePath;

    return (
        <>
        <div
            style={{
                width: '180px',
                height: '180px',
                borderRadius: '5px',
                position: 'relative'
            }}
        >
            <div style={{
                display: 'block',
                position: 'absolute',
                right: 0,
                width: 20,
                height: 20,
            }}
                onClick={(e) => {
                    e.stopPropagation();
                    props.props.service.delete(props.deleteQuery)
                    .then(response => {
                    })
                    .catch(e => {
                    });
                }}
            >X</div>
            <img
                style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '5px'
                }}
                src={src}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="data:image/png;base64,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";
                }}
            />
        </div>
        </>
    )
}

const items = []

const ImageList = (props) => {
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [imageOpen, setImageOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([]);

    const changeImage = (idImage, pathImage) => {
        console.log(idImage, pathImage)

        props.service.create({
            ...props.extra ?? null,
            id_image: idImage,
        })
        .then(response => {
            update();
        })
        .catch(e => {
        });

        setImageOpen(false)
    }

    const update = () => {
        setIsLoading(true)
        props.service.list({
            ...props.extra ?? null,
            page: page
        })
        .then(response => {
            for (let i = 0; i < response.data.List.length; i++) {
                response.data.List[i].key = response.data.List[i].id
            }

            setData(response.data.List)
            setTotal(response.data.Total)
            setIsLoading(false)
        })
        .catch(e => {
        });
    }

    useEffect(() => {
        update()
    }, [page, props.reload ?? false]);

    return (
        <>
        <Flex gap="small" wrap="wrap">
            <Button 
                onClick={(e) => {
                    setImageOpen(true)
                }}
                type="primary" icon={<PlusCircleOutlined />} size='large' 
            />
            <ImageModal
                imageOpen={imageOpen} 
                setImageOpen={setImageOpen}
                changeImage={changeImage}
            />
            <Popconfirm
                title="Delete the task"
                description="Are you shure to delete it"
                onConfirm={() => {}}
                okText="Yes"
                cancelText="No"
            >
                <Button 
                    type="primary" 
                    icon={<DeleteOutlined />} 
                    size='large'
                />
            </Popconfirm>
            
        </Flex>

        <Divider />

        <div
            style={{
                display: 'flex',
                columnGap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap',
            }}
        >
            {data.map((item, i) => {
                let query = props.getQuery(item.ImageID, props.extra.id_category || props.extra.id_product)
                console.log(query)
                console.log(props)

                return <CustomImage 
                    item={item} 
                    props={props}
                    deleteQuery={query}
                />
            })}
        </div>
        <div
            style={{
                textAlign: 'right',
                paddingTop: '20px',
                paddingBottom: '20px'
            }}
        >
        <Pagination 
            hideOnSinglePage={true}
            defaultCurrent={1} 
            total={total} 
            defaultPageSize={8} 
            onChange={(page) => {
                setPage(page-1)
            }}
            current={page+1}
        />
        </div>
        </>
    )
}

export default ImageList;