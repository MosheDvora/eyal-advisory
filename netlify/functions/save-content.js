// Using native fetch available in Node.js 18+


exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // Get the GitHub token from environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'GitHub token not configured' })
        };
    }

    try {
        const { content, branch = 'main' } = JSON.parse(event.body);
        const REPO_OWNER = 'MosheDvora';
        const REPO_NAME = 'eyal-advisory';
        const FILE_PATH = 'content.json';

        // 1. Get the current file SHA (required for updating)
        const currentFileResponse = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${branch}`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!currentFileResponse.ok) {
            throw new Error('Failed to fetch current file info');
        }

        const currentFileData = await currentFileResponse.json();
        const currentSha = currentFileData.sha;

        // 2. Prepare the new content (Base64 encoded)
        // Ensure pretty print for readability
        const jsonContent = JSON.stringify(content, null, 2);
        const base64Content = Buffer.from(jsonContent).toString('base64');

        // 3. Update the file via GitHub API
        const updateResponse = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Update content via Admin Panel',
                    content: base64Content,
                    sha: currentSha,
                    branch: branch
                })
            }
        );

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text();
            throw new Error(`GitHub API Error: ${errorText}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Content updated successfully' })
        };

    } catch (error) {
        console.error('Error saving content:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
