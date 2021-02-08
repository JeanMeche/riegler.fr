import { useRouter } from 'next/router';
import AnimatedStroke from '../components/AnimatedStroke/AnimatedStroke';

export default function DynamicPage(): JSX.Element {
  const router = useRouter();
  const {
    query: { s },
  } = router;
  console.log(router);
  return (
    <AnimatedStroke string={s as string} /> 
  ); 
}
