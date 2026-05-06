export const terms = [
  {
    term: "Artificial Intelligence (AI)",
    cat: "Foundations",
    tagline: "Machines that simulate human-like thinking",
    detail:
      "AI is the broad field of making computers do things that normally require human intelligence — like recognising images, understanding speech, or making decisions. Machine learning and deep learning are subsets of AI.",
    example: "Netflix recommending a show, or Siri answering a question.",
    link: "https://developers.google.com/machine-learning/glossary#artificial-intelligence",
  },
  {
    term: "Machine Learning (ML)",
    cat: "Foundations",
    tagline: "Computers learning from data without being explicitly programmed",
    detail:
      "Instead of writing rules manually, you feed a machine learning model lots of examples. It figures out the patterns on its own. There are three main types: supervised, unsupervised, and reinforcement learning.",
    example: "A spam filter that learns which emails are spam by studying thousands of examples.",
    link: "https://developers.google.com/machine-learning/crash-course",
  },
  {
    term: "Deep Learning (DL)",
    cat: "Foundations",
    tagline: "ML using many-layered neural networks",
    detail:
      "Deep learning is a type of machine learning that uses neural networks with many layers (hence 'deep'). It's especially powerful for images, audio, and text. It needs a lot of data and computing power.",
    example: "Face recognition on your phone, or ChatGPT generating text.",
    link: "https://www.deeplearning.ai/courses/",
  },
  {
    term: "Data Science",
    cat: "Foundations",
    tagline: "Extracting insights from data using stats, coding, and domain knowledge",
    detail:
      "Data science combines statistics, programming, and subject-matter expertise to collect, clean, analyse, and visualise data. ML is one tool in a data scientist's toolkit — but not the only one.",
    example: "Analysing Nepal's gaming trends using Python and charts.",
    link: "https://www.kaggle.com/learn",
  },
  {
    term: "Algorithm",
    cat: "Foundations",
    tagline: "A step-by-step set of instructions a computer follows",
    detail:
      "An algorithm is just a recipe. In ML, algorithms are the mathematical procedures the model uses to learn patterns from data. Different algorithms suit different problems.",
    example: "K-Means is an algorithm for grouping similar things together.",
    link: "https://developers.google.com/machine-learning/glossary#algorithm",
  },
  {
    term: "Model",
    cat: "Foundations",
    tagline: "The trained output of an ML algorithm — what makes predictions",
    detail:
      "A model is what you get after training an algorithm on data. It has 'learned' patterns and can now make predictions on new data it has never seen before.",
    example:
      "After training on gaming data, your model can predict whether a new player is a casual or competitive gamer.",
    link: "https://developers.google.com/machine-learning/crash-course/training-and-loss/video-lecture",
  },
  {
    term: "Training",
    cat: "Foundations",
    tagline: "Teaching a model by showing it examples",
    detail:
      "Training is the process of feeding data into an algorithm so it can learn. The model adjusts its internal settings (called parameters or weights) to get better at its task over many iterations.",
    example: "Showing a model 10,000 images of cats so it learns what a cat looks like.",
    link: "https://developers.google.com/machine-learning/crash-course/reducing-loss/video-lecture",
  },
  {
    term: "Dataset",
    cat: "Foundations",
    tagline: "A collection of data used to train or test a model",
    detail:
      "A dataset is your raw material. It's a structured collection of data — usually rows (observations) and columns (features). You typically split it into a training set and a test set.",
    example: "Your survey of 80-100 Nepali gamers is a dataset.",
    link: "https://developers.google.com/machine-learning/data-prep",
  },
  {
    term: "Feature",
    cat: "Foundations",
    tagline: "An individual measurable input variable used by the model",
    detail:
      "Features are the columns in your dataset — the attributes you use to make predictions. Choosing the right features (feature engineering) is one of the most important skills in data science.",
    example:
      "In your gaming project: session length, platform, age, and genre preference are all features.",
    link: "https://developers.google.com/machine-learning/crash-course/representation/feature-engineering",
  },
  {
    term: "Label / Target",
    cat: "Foundations",
    tagline: "The output variable the model is trying to predict",
    detail:
      "In supervised learning, the label is the answer you want the model to predict. It's also called the target variable or dependent variable.",
    example: "Predicting whether a player is 'mobile' or 'PC' — that's the label.",
    link: "https://developers.google.com/machine-learning/glossary#label",
  },
  {
    term: "Supervised Learning",
    cat: "ML Types",
    tagline: "Learning from labelled examples — input + correct answer pairs",
    detail:
      "In supervised learning, you give the model inputs AND the correct answers. It learns to map inputs to outputs. Used for classification (categories) and regression (numbers).",
    example:
      "Training a model on emails labelled 'spam' or 'not spam' so it can sort new emails.",
    link: "https://scikit-learn.org/stable/supervised_learning.html",
  },
  {
    term: "Unsupervised Learning",
    cat: "ML Types",
    tagline: "Finding patterns in data with no labels provided",
    detail:
      "In unsupervised learning, you only give the model inputs — no correct answers. It has to find structure on its own. Clustering is the most common form.",
    example:
      "Grouping Nepali gamers into casual, competitive, and social clusters without pre-labelling them.",
    link: "https://scikit-learn.org/stable/unsupervised_learning.html",
  },
  {
    term: "Reinforcement Learning",
    cat: "ML Types",
    tagline: "Learning by trial and error with rewards and penalties",
    detail:
      "An agent takes actions in an environment, receives rewards for good actions and penalties for bad ones, and learns to maximise reward over time. Think of it like training a dog with treats.",
    example: "AlphaGo learning to play the board game Go better than any human.",
    link: "https://gymnasium.farama.org/",
  },
  {
    term: "Classification",
    cat: "ML Types",
    tagline: "Predicting which category something belongs to",
    detail:
      "Classification is a supervised learning task where the output is a category — one of a fixed set of classes. Binary classification = two classes; multi-class = more than two.",
    example: "Predicting whether a player prefers PC, mobile, or console gaming.",
    link: "https://scikit-learn.org/stable/modules/multiclass.html",
  },
  {
    term: "Regression",
    cat: "ML Types",
    tagline: "Predicting a continuous number",
    detail:
      "Regression is a supervised learning task where the output is a number, not a category. Linear regression is the simplest form.",
    example: "Predicting how many hours per week a player will spend gaming.",
    link: "https://scikit-learn.org/stable/modules/linear_model.html",
  },
  {
    term: "Clustering",
    cat: "ML Types",
    tagline: "Grouping similar data points together automatically",
    detail:
      "Clustering is an unsupervised technique that groups data into clusters where items within a cluster are more similar to each other than to items in other clusters. K-Means is the most popular algorithm.",
    example: "Grouping your survey respondents into gamer types — exactly what your project does.",
    link: "https://scikit-learn.org/stable/modules/clustering.html",
  },
  {
    term: "Neural Network",
    cat: "Algorithms",
    tagline: "A model loosely inspired by the human brain's neurons",
    detail:
      "A neural network is made of layers of connected nodes (neurons). Input goes in one end, passes through hidden layers where patterns are learned, and a prediction comes out the other end. Deep learning = many hidden layers.",
    example:
      "The technology behind image recognition, speech-to-text, and LLMs like ChatGPT.",
    link: "https://playground.tensorflow.org/",
  },
  {
    term: "K-Means Clustering",
    cat: "Algorithms",
    tagline: "Groups data into K clusters by finding central points",
    detail:
      "K-Means picks K starting points (centroids), assigns each data point to the nearest centroid, then moves centroids to the average of their group. Repeats until stable. You choose how many clusters (K) you want.",
    example:
      "Setting K=3 to find casual, competitive, and social gamer segments in your Nepal survey data.",
    link: "https://scikit-learn.org/stable/modules/clustering.html#k-means",
  },
  {
    term: "Random Forest",
    cat: "Algorithms",
    tagline: "Many decision trees voting together for better accuracy",
    detail:
      "A random forest builds hundreds of decision trees, each trained on a random subset of data. Each tree makes a prediction, and the majority vote wins. More robust and accurate than a single decision tree.",
    example:
      "Predicting whether a player is a mobile or PC gamer using age, location, and session length.",
    link: "https://scikit-learn.org/stable/modules/ensemble.html#random-forests",
  },
  {
    term: "ARIMA",
    cat: "Algorithms",
    tagline: "A time-series forecasting model for trends in data over time",
    detail:
      "ARIMA (AutoRegressive Integrated Moving Average) models patterns in time-ordered data. It looks at past values to predict future ones. Good for trend analysis. Used in your project for tracking gaming platform shifts over time.",
    example:
      "Forecasting how mobile gaming adoption in Nepal will grow over the next 5 years.",
    link: "https://www.statsmodels.org/stable/tsa.html",
  },
  {
    term: "Logistic Regression",
    cat: "Algorithms",
    tagline: "A classification algorithm — despite the name, it does not predict numbers",
    detail:
      "Confusingly named, logistic regression predicts probabilities between 0 and 1 and is used for classification. It's simple, fast, and interpretable — often used as a baseline model.",
    example: "Predicting the probability that a gamer will switch from PC to mobile.",
    link: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
  },
  {
    term: "Decision Tree",
    cat: "Algorithms",
    tagline: "A flowchart-like model that splits data by asking yes/no questions",
    detail:
      "A decision tree splits data at each node based on a feature that best separates the classes. Easy to visualise and explain, but prone to overfitting on its own. Random forests fix this by combining many trees.",
    example:
      "Is age under 25? Yes → mobile player. No → Is income low? Yes → mobile. No → PC.",
    link: "https://scikit-learn.org/stable/modules/tree.html",
  },
  {
    term: "LLM (Large Language Model)",
    cat: "Modern AI",
    tagline: "A massive neural network trained on text to understand and generate language",
    detail:
      "LLMs are trained on billions of words from the internet, books, and code. They learn statistical patterns in language and can generate fluent text, answer questions, translate, and code. ChatGPT, Claude, and Gemini are all LLMs.",
    example: "Claude (what you're talking to right now) is an LLM.",
    link: "https://huggingface.co/docs/transformers/index",
  },
  {
    term: "GPT",
    cat: "Modern AI",
    tagline: "Generative Pre-trained Transformer — the architecture behind ChatGPT",
    detail:
      "GPT is a type of LLM developed by OpenAI. 'Generative' means it produces text. 'Pre-trained' means it learned from massive data before being fine-tuned. 'Transformer' is the neural network architecture it uses.",
    example: "ChatGPT-4 is built on the GPT-4 model.",
    link: "https://platform.openai.com/docs/concepts",
  },
  {
    term: "Transformer",
    cat: "Modern AI",
    tagline: "The neural network architecture behind modern AI — uses attention mechanisms",
    detail:
      "Transformers revolutionised AI in 2017. They process all words in a sentence simultaneously (not one by one) using a mechanism called 'attention' that lets the model focus on the most relevant words. Almost all modern LLMs use transformers.",
    example:
      "When Claude reads your message, the transformer architecture lets it understand which words relate to which.",
    link: "https://huggingface.co/learn/nlp-course/chapter1/4",
  },
  {
    term: "Fine-tuning",
    cat: "Modern AI",
    tagline: "Taking a pre-trained model and training it further on specific data",
    detail:
      "Instead of training from scratch (expensive), you take a model already trained on general data and train it more on your specific domain. It adapts the model's behaviour for a particular task.",
    example:
      "Taking a general LLM and fine-tuning it on medical records to create a medical AI assistant.",
    link: "https://huggingface.co/docs/transformers/training",
  },
  {
    term: "Prompt Engineering",
    cat: "Modern AI",
    tagline: "Crafting inputs to get better outputs from AI models",
    detail:
      "How you phrase a request to an LLM significantly affects the quality of the response. Prompt engineering is the practice of designing inputs (prompts) strategically to get accurate, useful outputs.",
    example:
      "Saying 'You are an expert data scientist. Explain K-Means step by step for a beginner' gets better results than just 'explain K-Means'.",
    link: "https://www.promptingguide.ai/",
  },
  {
    term: "Overfitting",
    cat: "Model Evaluation",
    tagline: "Model memorised the training data but fails on new data",
    detail:
      "Overfitting happens when a model learns the training data too well — including its noise and quirks — and can't generalise to new data. It performs great on training data but poorly on test data. Like memorising exam answers without understanding the subject.",
    example:
      "A model trained only on Kathmandu gamers that fails to predict gamer behaviour in Pokhara.",
    link: "https://developers.google.com/machine-learning/crash-course/generalization/peril-of-overfitting",
  },
  {
    term: "Underfitting",
    cat: "Model Evaluation",
    tagline: "Model is too simple to capture the patterns in the data",
    detail:
      "Underfitting is the opposite of overfitting. The model is too simple and misses important patterns, performing poorly on both training and test data.",
    example:
      "Using a straight line to model a curved relationship between age and gaming hours.",
    link: "https://developers.google.com/machine-learning/crash-course/generalization/peril-of-overfitting",
  },
  {
    term: "Train / Test Split",
    cat: "Model Evaluation",
    tagline: "Dividing data into a portion to learn from and a portion to evaluate on",
    detail:
      "You never test a model on the same data it trained on — that's like showing students the exam answers. Typically 70-80% of data is used for training and 20-30% for testing.",
    example:
      "Using 80 of your 100 survey responses to train your clustering model and 20 to validate it.",
    link: "https://scikit-learn.org/stable/modules/cross_validation.html",
  },
  {
    term: "Cross-validation",
    cat: "Model Evaluation",
    tagline: "A rigorous way to test model performance using multiple splits",
    detail:
      "Instead of one train/test split, cross-validation splits data into K folds. The model trains on K-1 folds and tests on the remaining fold, rotating K times. Gives a more reliable performance estimate.",
    example:
      "5-fold cross-validation: split your data into 5 parts, test on each part once while training on the other 4.",
    link: "https://scikit-learn.org/stable/modules/cross_validation.html",
  },
  {
    term: "Accuracy",
    cat: "Model Evaluation",
    tagline: "The percentage of predictions the model got right",
    detail:
      "Accuracy = correct predictions / total predictions. Simple and intuitive, but misleading when classes are imbalanced. If 95% of players are mobile gamers, a model that always guesses 'mobile' gets 95% accuracy but learns nothing.",
    example: "Your model correctly classifies 78 out of 100 gamers — accuracy is 78%.",
    link: "https://scikit-learn.org/stable/modules/model_evaluation.html#accuracy-score",
  },
  {
    term: "Precision & Recall",
    cat: "Model Evaluation",
    tagline: "More nuanced measures of classification performance",
    detail:
      "Precision = of all the times you predicted class X, how often were you right? Recall = of all the actual class X examples, how many did you find? There's a trade-off between them.",
    example:
      "High precision, low recall: you only flag gamers as 'competitive' when very sure, but miss many actual competitive gamers.",
    link: "https://scikit-learn.org/stable/modules/precision_recall.html",
  },
  {
    term: "F1 Score",
    cat: "Model Evaluation",
    tagline: "A single number balancing precision and recall",
    detail:
      "F1 score is the harmonic mean of precision and recall. Useful when you want a single metric that balances both concerns. Ranges from 0 (worst) to 1 (best).",
    example:
      "An F1 score of 0.82 means your model has a good balance of finding the right gamers and being accurate about it.",
    link: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html",
  },
  {
    term: "Confusion Matrix",
    cat: "Model Evaluation",
    tagline: "A table showing where your model's predictions went right and wrong",
    detail:
      "A confusion matrix shows true positives, true negatives, false positives, and false negatives. It gives you a full picture of where the model is making mistakes.",
    example:
      "Your model correctly identified 40 mobile gamers but mistakenly labelled 10 PC gamers as mobile — that's a false positive.",
    link: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html",
  },
  {
    term: "Silhouette Score",
    cat: "Model Evaluation",
    tagline: "Measures how well-separated clusters are — used with K-Means",
    detail:
      "Silhouette score ranges from -1 to 1. A score close to 1 means clusters are tight and well-separated. Near 0 means overlapping. Negative means points may be in the wrong cluster. Used to choose the right K.",
    example:
      "Testing K=2, 3, 4, 5 clusters and picking the K with the highest silhouette score for your gamer segments.",
    link: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.silhouette_score.html",
  },
  {
    term: "Parameters & Hyperparameters",
    cat: "Model Evaluation",
    tagline: "Parameters are learned by the model; hyperparameters are set by you",
    detail:
      "Parameters are internal values the model learns during training (like weights in a neural network). Hyperparameters are settings you choose before training — like how many clusters in K-Means or how deep a decision tree goes.",
    example:
      "K in K-Means is a hyperparameter — you decide it. The cluster centroids are parameters the model learns.",
    link: "https://scikit-learn.org/stable/modules/grid_search.html",
  },
  {
    term: "Data Preprocessing",
    cat: "Data Science",
    tagline: "Cleaning and preparing raw data before feeding it to a model",
    detail:
      "Raw data is messy. Preprocessing includes handling missing values, removing duplicates, fixing inconsistencies, converting data types, and standardising formats. Garbage in = garbage out.",
    example:
      "Cleaning your Nepali gamer survey — filling in missing age values, fixing typos in platform names.",
    link: "https://scikit-learn.org/stable/modules/preprocessing.html",
  },
  {
    term: "Feature Engineering",
    cat: "Data Science",
    tagline: "Creating new, more useful features from existing data",
    detail:
      "Sometimes raw features are not the most useful form. Feature engineering is the art of transforming or combining raw variables into features that help the model learn better.",
    example:
      "Creating a 'gaming intensity' score by combining session length and sessions per week from your survey.",
    link: "https://developers.google.com/machine-learning/crash-course/representation/feature-engineering",
  },
  {
    term: "Normalisation / Scaling",
    cat: "Data Science",
    tagline: "Rescaling features so they are on the same scale",
    detail:
      "Many ML algorithms are sensitive to the scale of features. If age ranges from 15-35 and session length ranges from 0-600 minutes, the session length will dominate. Normalisation (0 to 1) or standardisation (mean 0, std 1) fixes this.",
    example:
      "Scaling age and session hours to the same range before running K-Means on your gamer data.",
    link: "https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling",
  },
  {
    term: "Imputation",
    cat: "Data Science",
    tagline: "Filling in missing values in your dataset",
    detail:
      "When data is missing, you can't just delete those rows. Imputation fills missing values with a reasonable substitute — the mean, median, or mode of that column, or a prediction from another model.",
    example:
      "If 5 survey respondents didn't answer the age question, fill it in with the median age of all respondents.",
    link: "https://scikit-learn.org/stable/modules/impute.html",
  },
  {
    term: "EDA (Exploratory Data Analysis)",
    cat: "Data Science",
    tagline: "Exploring and visualising data to understand it before modelling",
    detail:
      "Before building any model, you look at your data. EDA uses charts, summary statistics, and correlation analysis to find patterns, spot outliers, and understand relationships between variables.",
    example:
      "Plotting a bar chart of platform preference by age group to see if younger Nepali gamers prefer mobile.",
    link: "https://www.kaggle.com/learn/data-visualization",
  },
  {
    term: "Correlation",
    cat: "Data Science",
    tagline: "A measure of how strongly two variables move together",
    detail:
      "Correlation ranges from -1 to 1. Close to 1 = strong positive relationship. Close to -1 = strong negative. Near 0 = no relationship. Correlation does not mean one causes the other.",
    example:
      "Strong correlation between smartphone ownership and mobile gaming preference in your Nepal data.",
    link: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.corr.html",
  },
  {
    term: "Pandas",
    cat: "Tools & Libraries",
    tagline: "Python library for working with structured data tables",
    detail:
      "Pandas is the most used Python library for data manipulation. It provides DataFrames — like spreadsheets in code — for loading, cleaning, filtering, grouping, and transforming data.",
    example:
      "Using pd.read_csv() to load your gamer survey responses, then df.dropna() to remove missing rows.",
    link: "https://pandas.pydata.org/docs/user_guide/index.html",
  },
  {
    term: "NumPy",
    cat: "Tools & Libraries",
    tagline: "Python library for fast numerical computation and arrays",
    detail:
      "NumPy provides efficient array operations and mathematical functions. Pandas is built on top of NumPy. You'll often use NumPy for matrix operations and statistical calculations.",
    example:
      "Computing the mean session length across all survey respondents with np.mean().",
    link: "https://numpy.org/doc/stable/user/absolute_beginners.html",
  },
  {
    term: "Scikit-learn",
    cat: "Tools & Libraries",
    tagline: "Python's go-to ML library — algorithms, evaluation, preprocessing",
    detail:
      "Scikit-learn provides ready-to-use implementations of almost every classic ML algorithm, plus tools for preprocessing, model evaluation, and cross-validation. Clean, consistent API.",
    example:
      "from sklearn.cluster import KMeans — then fitting it to your gamer data in a few lines of code.",
    link: "https://scikit-learn.org/stable/getting_started.html",
  },
  {
    term: "Plotly / Dash",
    cat: "Tools & Libraries",
    tagline: "Libraries for creating interactive charts and dashboards in Python",
    detail:
      "Plotly creates interactive charts (zoom, hover, filter). Dash lets you build full interactive web dashboards in pure Python — no JavaScript needed. Perfect for your local gaming trends dashboard.",
    example:
      "Building an interactive line chart showing Nepal's PC vs mobile gaming adoption from 2003 to 2024.",
    link: "https://dash.plotly.com/",
  },
  {
    term: "Jupyter Notebook",
    cat: "Tools & Libraries",
    tagline: "An interactive coding environment mixing code, output, and notes",
    detail:
      "Jupyter Notebooks let you write code in cells, run them one at a time, see outputs inline, and write explanatory text between them. Standard tool for data science exploration and documentation.",
    example:
      "Running your EDA code cell by cell, seeing charts appear inline as you explore your gamer dataset.",
    link: "https://docs.jupyter.org/en/latest/",
  },
  {
    term: "Statsmodels",
    cat: "Tools & Libraries",
    tagline: "Python library for statistical models including ARIMA",
    detail:
      "Statsmodels focuses on statistical tests and models — regression, time-series models like ARIMA, hypothesis testing. More statistics-focused than Scikit-learn.",
    example:
      "Using statsmodels to fit an ARIMA model to Nepal's gaming adoption time-series data.",
    link: "https://www.statsmodels.org/stable/gettingstarted.html",
  },
  {
    term: "Big Data",
    cat: "Data Science",
    tagline: "Datasets too large or complex for traditional tools to handle",
    detail:
      "Big Data is characterised by the 3 Vs: Volume (huge amount), Velocity (generated fast), Variety (many formats). Requires distributed computing tools like Apache Spark / PySpark to process.",
    example:
      "All Steam gaming logs globally — billions of rows that a single laptop cannot process.",
    link: "https://spark.apache.org/docs/latest/",
  },
  {
    term: "PySpark",
    cat: "Tools & Libraries",
    tagline: "Python interface to Apache Spark — for processing big data across many computers",
    detail:
      "PySpark lets you write Python code that runs on a cluster of computers in parallel. Used when data is too large for a single machine. Your manhwa proposal used PySpark.",
    example: "Processing a dataset of 100 million gaming sessions across distributed servers.",
    link: "https://spark.apache.org/docs/latest/api/python/getting_started/index.html",
  },
  {
    term: "Time-Series Analysis",
    cat: "Data Science",
    tagline: "Analysing data points collected over time to find trends and patterns",
    detail:
      "Time-series data has a time dimension — measurements recorded at regular intervals. Analysis involves trend detection, seasonality, and forecasting future values. ARIMA is a classic time-series model.",
    example:
      "Tracking monthly mobile game downloads in Nepal from 2010 to 2024 to find the inflection point.",
    link: "https://www.statsmodels.org/stable/tsa.html",
  },
];

export const badgeColors = {
  Foundations: { bg: "#E6F1FB", color: "#0C447C" },
  "ML Types": { bg: "#E1F5EE", color: "#085041" },
  Algorithms: { bg: "#EEEDFE", color: "#3C3489" },
  "Modern AI": { bg: "#FAECE7", color: "#712B13" },
  "Model Evaluation": { bg: "#FAEEDA", color: "#633806" },
  "Data Science": { bg: "#EAF3DE", color: "#27500A" },
  "Tools & Libraries": { bg: "#FBEAF0", color: "#72243E" },
};
