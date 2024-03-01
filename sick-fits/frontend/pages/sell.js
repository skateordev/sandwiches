import { CreateProduct } from '../components';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';

export default function SellPage() {
  return (
    <div>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  );
}
