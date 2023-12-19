import React from 'react'
import './Home.css'

function Home() {
    return(
        <>
            <h1>מערכת להרשמה מקוונת לתגבורים</h1>

            <div className='info'>
                <h3>My Classement לתלמידים מאפשרת:</h3>

                <table>
                    <tbody>
                        <tr className='odd'>
                            <td className='icon'>
                                <img src="/icons/class.png" alt="class icon" width="50" height="50"/>
                            </td>
                            <td>
                                <p>לראות את התגבורים שבית הספר מציע להם</p>
                            </td>
                        </tr>
                        <tr className='even'>
                            <td className='icon'>
                                <img src="/icons/house.png" alt="house icon" width="50" height="50"/>
                            </td>
                            <td>
                                <p>להרשם לתגבורים מהבית</p>
                            </td>
                        </tr>
                        <tr className='odd'>
                            <td className='icon'>
                                <img src="/icons/open-book.png" alt="book icon" width="50" height="50"/>
                            </td>
                            <td>    
                                <p>לצפות בחומרי הלימוד מהתגבורים האחרונים</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='info'>
                <h3>ו-My Classement למורים מאפשרת:</h3>

                <table>
                    <tbody>
                        <tr className='odd'>
                            <td className='icon'>
                                <img src="/icons/clock.png" alt="clock icon" width="50" height="50"/>
                            </td>
                            <td>
                                <p>לעדכן את הזמנים המתאימים להם לביצוע תגבורים</p>
                            </td>
                        </tr>
                        <tr className='even'>
                            <td className='icon'>
                                <img src="/icons/computer.png" alt="computer icon" width="50" height="50"/>
                            </td>
                            <td>
                                <p>לעקוב אחר ההרשמות לתגבורים</p>
                            </td>
                        </tr>
                        <tr className='odd'>
                            <td className='icon'>
                                <img src="/icons/book.png" alt="book icon" width="50" height="50"/>
                            </td>
                            <td>
                                <p>להעלות חומרי לימוד</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;