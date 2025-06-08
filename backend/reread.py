from pathlib import Path
import networkx as nx
import pickle
import gzip

def load_pickled_graph(data_dir: str) -> nx.DiGraph:
    data_path = Path(data_dir)
    pickle_file = data_path / "large_data.pkl.gz"

    if not pickle_file.exists():
        raise FileNotFoundError(f"Pickled graph not found at {pickle_file}")

    print(f"Loading pickled graph from {pickle_file}...")
    with gzip.open(pickle_file, 'rb') as f:
        graph = pickle.load(f)

    print(f"Graph loaded: {len(graph.nodes)} nodes, {len(graph.edges)} edges")
    return graph

load_pickled_graph("./")

