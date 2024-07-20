import React from 'react';

function CommentsLayout({ commentData }) {
    return (
        <div>
            {commentData.map(comment => (
                <>
                    <div key={comment._id} class="flex z-24 sm:w-72 w-[90vw] gap-2 p-4">
                        <div class="h-10 w-10 rounded-full"><img className='rounded-full' src={comment.user.avatar.url} alt={`${comment.user.fullname}'s avatar`} /></div>
                        <div class="flex-1">
                            <div class="mb-1 h-5 w-3/5 rounded-lg  text-lg">  <h4>{comment.user.fullname}</h4></div>
                            <div class="h-5 w-[190px] rounded-lg  text-sm"><p>{comment.content}</p></div>
                        </div>
                        <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                    </div>
                </>

            ))}
        </div>
    );
}

export default CommentsLayout;
