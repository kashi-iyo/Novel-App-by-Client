function useRedirect() {

    const redirect = (history, url) => {
        history.push(url)
    }

    return { redirect }
}

export default useRedirect
