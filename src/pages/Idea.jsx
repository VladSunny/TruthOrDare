import { Button, FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import React, {useEffect} from "react";
import { supabase } from "../database/Database";
import CircularProgress from '@mui/material/CircularProgress';
import DefaultButton from "../UI/Button/DefaultButton";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import LabledRating from "../UI/Rating/LabledRating";
import IosShareIcon from '@mui/icons-material/IosShare';

function Idea() {
    const { user, rated, setRated } = useUser();
    const [isDare, setIsDare] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [ideas, setIdeas] = React.useState([]);
    const [rating, setRating] = React.useState(2);
    const [curRated, setCurRated] = React.useState(false);

    useEffect(() => {
        const fetchIdeas = async () => {
            const { data } = await supabase.from("ideas").select("*").eq("accepted", true);
            setIdeas(data);
        };

        fetchIdeas();
    }, []);

    useEffect(() => {
        console.log(rating);
    }, [rating])

    useEffect(() => {
        const fetchResult = async () => {
            if (!result) return;

            setCurRated(false);

            for (let id of rated) {
                if (id === result?.id) {
                    setCurRated(true);
                    break;
                }
            }
        }

        fetchResult();
    }, [result, rated])
    

    const getRandomIdea = () => {
        if (ideas?.length === 0) return;

        if (isDare) {
            const dares = ideas.filter(idea => idea.is_dare);
            return dares[Math.floor(Math.random() * dares.length)];
        }
        else {
            const truths = ideas.filter(idea => !idea.is_dare);
            return truths[Math.floor(Math.random() * truths.length)];
        }
    }

    const rateHandler = async () => {
        if (!result || !user) return;

        const { error: error1 } = await supabase
        .from('ideas')
        .update({ratings_sum: result.ratings_sum + rating, ratings_count: result.ratings_count + 1})
        .eq('id', result.id)

        if (error1) {
            console.log(error1);
            return;
        }

        console.log(rated, result.id);

        const { error: error2} = await supabase
        .from('users')
        .update({
            rated: [
                ...(rated || []),
                result.id
            ]
        })
        .eq('id', user.id);

        setRated([...rated, result.id]);

        if (error2) {
            console.log(error2);
            return;
        }
    }

    return (
        <div className='h-fit variantfill-four flex flex-col items-center'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl text-center w-11/12 md:w-2/3 py-10 variantfill-two p-5 my-5 rounded-2xl flex justify-center shadow-lg'>
                Правда или действие?
            </h1>

            <p className="flex justify-center text-1xl md:text-2xl lg:text-3xl w-11/12 md:w-2/3 variantfill-one p-5 rounded-2xl text-center mb-5">
                В базе данных сайта собраны лучшие вопросы для комфортной игры в "правда или действие", 
                а также идеи пользователей.
                Нажмите на кнопку ниже и получите слуйчаный вопрос или действие из списка
            </p>

            <div>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    onChange={(event) => setIsDare(event.target.value === 'dare')}
                    defaultValue={'truth'}
                >
                    <FormControlLabel value="truth" control={<Radio />} label="Правда" />
                    <FormControlLabel value="dare" control={<Radio />} label="Действие" />
                </RadioGroup>
            </div>
    
            <div className="my-5">
                {ideas?.length === 0 && (
                    <CircularProgress />
                )}
                {ideas?.length > 0 && (
                    <Button color="success" variant='contained' size='large' onClick={() => setResult(getRandomIdea())}>получить идею</Button>
                )}
            </div>

            <div className='rounded-3xl border-8 w-11/12 md:w-4/5 my-10 p-5 flex items-center justify-center flex-col'>
                {result?.idea}
            </div>
            
            {user && (
                <div className="mb-10 flex flex-col justify-center items-center">
                    {!curRated && result && (
                        <div className="mb-10 w-fit flex flex-row justify-center items-center">
                            <LabledRating onChange={(newRating) => {setRating(newRating)}}/>
                            <div className="ml-5">
                                <IconButton onClick={rateHandler}>
                                    <IosShareIcon />
                                </IconButton>
                            </div>
                        </div>
                    )}

                    <Link to="/IdeasStudio" className="w-fit h-fit">
                        <DefaultButton size="large">Поделиться своей идеей</DefaultButton>
                    </Link>
                </div>
            )}

            {!user && (
                <Link to="/SignIn" className="w-fit h-fit mb-5">
                    <DefaultButton size="large">Чтобы поделиться своей идеей, войдите в аккаунт</DefaultButton>
                </Link>
            )}
        </div>
    )
}

export default Idea;
