import vueMarkdown from 'vue-markdown';
export default {
    name: 'ViewMarkdown',
    functional: true,
    props: {
        data: {
            type: String,
        },
    },
    render (h, context) {
        return (
            <vueMarkdown {...context.data.attrs}>{context.props.data}</vueMarkdown>
        );
    },
};
