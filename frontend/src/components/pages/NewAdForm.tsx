import { SubmitHandler, useForm } from "react-hook-form";
import {
  AdInput,
  useCreateAdMutation,
  useGetAllCategoriesAndTagsQuery,
} from "../../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { GET_ALL_ADS } from "../../graphql/operations";

const NewAdForm = () => {
  const navigate = useNavigate();

  // bellow is a way to ask apollo to refetch somes queries
  /*   const client = useApolloClient();
  await client.refetchQueries({
    include: [GET_ALL_ADS],
  }); */

  const { error, loading, data } = useGetAllCategoriesAndTagsQuery();

  // useing the refetch queries here, if the mutation succeed, the GET_ALL_ADS will be re-executed
  const [createAd] = useCreateAdMutation({
    refetchQueries: [
      {
        query: GET_ALL_ADS,
      },
    ],
  });
  const { register, handleSubmit, formState: { errors } } = useForm<AdInput>();

  const onSubmit: SubmitHandler<AdInput> = async (data) => {
    console.log(data)
    try {
      const sanitizedData = { ...data, price: Number(data.price) };

      const { data: newAdData } = await createAd({
        variables: { data: sanitizedData },
      });
      // bellow the version without the destructuration / alias
      // const result = await createAd({ variables: { data: newData } });
      // const newAdData = result.data;
      navigate(`/ad/${newAdData?.createAd.id}`, { replace: true });
    } catch {
      toast.error("An error occurred !");
    }
  };

  

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={"Je vends ma 206"}
          {...register("title", { required: true, minLength: 3 })}
          
        />
      </label>
      {errors.title?.type && <p>Category must have at least 3 characters</p>}

      <br />

      <label>
        Description
        <input
          defaultValue={"Ma 206 est super"}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={"John Doe"}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={"Paris"}
          {...register("location", { required: true })}
        />
      </label>

      <br />

      <label>
        Image
        <input
          defaultValue={
            "https://www.actuauto.fr/wp-content/uploads/2021/01/Peugeot-206-scaled.jpg"
          }
          {...register("image", { required: true })}
        />
      </label>

      <br />

      <label>
        Prix
        <input
          type="number"
          defaultValue={4000}
          {...register("price", { required: true })}
        />
      </label>

      <br />

      <label>
        Categorie
        <select {...register("category", { required: true })}>
          {data?.getAllCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <br />
      {data?.getAllTags.map((tag) => (
        <div key={tag.id}>
          <label>
            {tag.name}
            <input value={tag.id} type="checkbox" {...register("tags")} />
          </label>
        </div>
      ))}

      <input type="submit" />
    </form>
  );
};
export default NewAdForm;