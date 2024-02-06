import { z } from "zod";
import { H3 } from "tamagui";

import { LoginSchema } from "../../utils/validations/auth.utils";
import { Container } from "../../components/layout/container";

type LoginSchemaType = z.infer<typeof LoginSchema>;

const TabOneScreen = () => {
  return (
    <Container>
      <H3>Logged</H3>
    </Container>
  );
};

export default TabOneScreen;
