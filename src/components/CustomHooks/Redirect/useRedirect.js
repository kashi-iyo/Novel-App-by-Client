
function useRedirect({history}) {

    const redirect = (url) => {
        history.push(url)
    }

    return { redirect }
}

export default useRedirect
