import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  useCreateAdMutation,
  useGetOneAdQuery,
  useGetAllCategoriesAndTagsQuery,
} from "../../generated/graphql-types";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  image: string;
  location: string;
  category: number;
  tags: string[];
};

const EditAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: dataCatsAndTags,
    loading: loadCatsAndTags,
    error: errCatsAndTags,
  } = useGetAllCategoriesAndTagsQuery();
  const {
    data: dataAd,
    loading: loadAd,
    error: errAd,
  } = useGetOneAdQuery({
    variables: { adId: Number(id) },
  });
  const [createAd] = useCreateAdMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const newData = {
        ...data,
        category: `${data.category}`,
      };
      const { data: newAdData } = await createAd({
        variables: {data : newData },
      });
      // const result = await createAd({ variables: { data: newData } });
      // const newAdData = result.data;
      navigate(`/ads/${newAdData?.createAd}`, { replace: true });
    } catch {
      toast.error("Une error !");
    }
  };

  if (errAd || errCatsAndTags) return <p>Woops, we broke something</p>;
  if (!loadAd || loadCatsAndTags) return <p>Still loading, plz wait...</p>;
  if (!dataAd || !dataCatsAndTags)
    return <p>Something's amiss (should never render this)</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={dataAd.getOneAd.title}
          {...register("title", { required: true })}
        />
      </label>

      <br />

      <label>
        Description
        <input
          defaultValue={dataAd.getOneAd.description}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={dataAd.getOneAd.owner}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={dataAd.getOneAd.location}
          {...register("location", { required: true })}
        />
      </label>

      <br />

      <label>
        Image
        <input
          defaultValue={dataAd.getOneAd.image}
          {...register("image", { required: true })}
        />
      </label>

      <br />

      <label>
        Prix
        <input
          type="number"
          defaultValue={dataAd.getOneAd.price}
          {...register("price", { required: true })}
        />
      </label>

      <br />

      <label>
        Categorie
        <select
          defaultValue={dataAd.getOneAd.category.name}
          {...register("category", { required: true })}
        >
          {dataCatsAndTags.getAllCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <br />
      {dataCatsAndTags.getAllTags.map((tag) => (
        <div key={tag.id}>
          <label>
            {tag.name}
            <input
              defaultChecked={dataAd.getOneAd.tags.some((el) => el.id === tag.id)}
              value={tag.id}
              type="checkbox"
              {...register("tags")}
            />
          </label>
        </div>
      ))}

      <input type="submit" />
    </form>
  );
};
export default EditAdForm;