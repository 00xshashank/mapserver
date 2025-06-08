import pickle
import gzip

with open("./data/bengaluru_graph.pkl", "rb") as f_in:
    with gzip.open("large_data.pkl.gz", "wb") as f_out:
        f_out.writelines(f_in)
