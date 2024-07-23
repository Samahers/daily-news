import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { addToNewsLetter } from "../../store/utils/thunk";
import { showToast } from "./tools"
import { useDispatch } from "react-redux";
import { clearNewsletter} from "../../store/reducers/users"

const Newsletter = () => {
  const textInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;

    dispatch(addToNewsLetter({ email: value }))
      .unwrap()
      .then((response) => {
        if (response.newsletter === "added") {
          showToast("SUCCESS", "thank you >///<");

          console.log("are you even here");
        }
        if (response.newsletter === "failed") {
          showToast("ERROR", "already subscrived");
          console.log("false");
        }
        textInput.current.value = "";
        dispatch(clearNewsletter());
      });
  };

  return (
    <>
      <div className="newsletter_container">
        <h1> join our newsletter</h1>

        <div className="form">
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="EXAMPLE: youremail@gmail.com"
                name="email"
                ref={textInput}
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">
              add me to the list
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
